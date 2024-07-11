package main

import (
	"campus/auth/src/models"
	"campus/auth/src/views"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	models.ConnectDatabase()
	config := cors.DefaultConfig()

	config.AllowAllOrigins = true
	config.AllowMethods = []string{"POST", "GET", "PUT", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Authorization", "Accept", "User-Agent", "Cache-Control", "Pragma"}
	config.ExposeHeaders = []string{"Content-Length"}
	config.AllowCredentials = true
	config.MaxAge = 12 * time.Hour

	router.Use(cors.New(config))
	router.GET("", views.HelloWorld)
	router.GET("/user", views.FindUsers)
	router.GET("/user/:id", views.FindUser)
	router.POST("/user", views.CreateUser)
	router.PATCH("/user/:id", views.UpdateUser)
	router.GET("/signin", views.HelloWorld)
	router.POST("/signin", views.SignIn)

	router.Run()
}
