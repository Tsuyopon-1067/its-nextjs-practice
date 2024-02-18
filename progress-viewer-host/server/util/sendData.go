package util

import (
	"sort"
	"time"
)

type SendData struct {
	Data []ProgressInfo `json:"data"`
	Time string         `json:"time"`
}

func (s *SendData) New(data []ProgressInfo) SendData {
	sort.Slice(data, func(i, j int) bool {
		return data[i].Id < data[j].Id
	})
	currentTime := time.Now().Format("2006-01/02-15:04:05")
	return SendData{Data: data, Time: currentTime}
}
