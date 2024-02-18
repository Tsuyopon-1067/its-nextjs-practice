package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"server/util"
	"strings"
)

var safeMap util.SafeMap

func enableCors(w *http.ResponseWriter) {
    (*w).Header().Set("Access-Control-Allow-Origin", "*")
    (*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
    (*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

func jsonHandler(w http.ResponseWriter, r *http.Request) {
    enableCors(&w)
    fmt.Println("/json")
    if r.Method == http.MethodOptions {
        return
    }

    switch r.Method {
        case http.MethodPost:
            jsonPostHandler(w, r)
        case http.MethodDelete:
            jsonDeleteHandler(w, r)
        default:
            http.Error(w, "Only POST method is allowed", http.StatusMethodNotAllowed)
            return
    }

}

func jsonPostHandler(w http.ResponseWriter, r *http.Request) {
    var requestBody util.ProgressInfo
    err := json.NewDecoder(r.Body).Decode(&requestBody)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }
    defer r.Body.Close()

    log.Printf("Received: %v", requestBody)
    safeMap.Set(requestBody.Id, util.ProgressInfo{Id: requestBody.Id, Former: requestBody.Former, Latter: requestBody.Latter})


    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(struct {
        Status string `json:"status"`
    }{
        Status: "Success",
    })
}

func jsonDeleteHandler(w http.ResponseWriter, r *http.Request) {
    enableCors(&w) // enable CORS

    var requestBody util.DeleteData
    err := json.NewDecoder(r.Body).Decode(&requestBody)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }
    defer r.Body.Close()

    log.Printf("Received: %v", requestBody)
    safeMap.Delete(requestBody.Id)

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(struct {
        Status string `json:"status"`
    }{
        Status: "Success",
    })
}

func getInfoHandler(w http.ResponseWriter, r *http.Request) {
    enableCors(&w) // enable CORS

    if r.Method != http.MethodGet {
        http.Error(w, "Only GET method is allowed", http.StatusMethodNotAllowed)
        return
    }

    fmt.Println("GET /info")
    list := safeMap.GetData()
    sendData := (&util.SendData{}).New(list)

    w.Header().Set("Content-Type", "application/json")
    if err := json.NewEncoder(w).Encode(sendData); err != nil {
        log.Fatalf("Error encoding JSON: %v", err)
    }
}

func fileHandler(w http.ResponseWriter, r *http.Request) {
    requestedPath := r.URL.Path
    if strings.HasPrefix(requestedPath, "/static/") {
        fs := http.StripPrefix("/static/", http.FileServer(http.Dir("static")))
        fs.ServeHTTP(w, r)
    } else {
        http.NotFound(w, r)
    }
}

func main() {
    safeMap = (&util.SafeMap{}).New()

    http.HandleFunc("/json", jsonHandler)
    http.HandleFunc("/get", getInfoHandler)
    http.HandleFunc("/", fileHandler)

    log.Println("Server is running on http://localhost:8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}