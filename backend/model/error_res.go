package model

type ErrorResponse struct{
	Result  bool   `json:"result"`
	Message string `json:"message"`
}