package main

import (
	"one-liner-diary/routes"
)

func main() {
	e := routes.SetUpRouter()
	e.Logger.Fatal(e.Start(":8080"))
}
