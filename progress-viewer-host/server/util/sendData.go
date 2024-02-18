package util

import "sort"

type SendData struct {
	Data []ProgressInfo `json:"data"`
}

func (s *SendData) New(data []ProgressInfo) SendData {
	sort.Slice(data, func(i, j int) bool {
		return data[i].Id < data[j].Id
	})
	return SendData{Data: data}
}
