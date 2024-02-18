package util

import "sync"

type SafeMap struct {
	m   map[string]ProgressInfo
	mux sync.Mutex
}

// Setはマップにキーと値のペアを設定する。同期を保証するためにMutexを使用
func (s *SafeMap) Set(key string, value ProgressInfo) {
	s.mux.Lock()         // 書き込み操作前にロック
	defer s.mux.Unlock() // 操作が完了したらアンロック
	s.m[key] = value
}

// Getはマップからキーに対応する値を取得する。Mutexは不要（読み取りのみ）
func (s *SafeMap) Get(key string) (ProgressInfo, bool) {
	s.mux.Lock()         // 読み取り操作前にロック
	defer s.mux.Unlock() // 操作が完了したらアンロック
	value, ok := s.m[key]
	return value, ok
}

func (s *SafeMap) GetData() ([]ProgressInfo) {
	s.mux.Lock()         // 読み取り操作前にロック
	defer s.mux.Unlock() // 操作が完了したらアンロック
	res := make([]ProgressInfo, 0, len(s.m))
	for _, v := range s.m {
		res = append(res, v)
	}
	return res
}

type ProgressInfo struct {
	Id      string    `json:"id"`
    Former  []bool    `json:"formerInfo"`
    Latter  []bool    `json:"latterInfo"`
}


func (s *SafeMap) New() (SafeMap) {
    return SafeMap{m: make(map[string]ProgressInfo)}
}