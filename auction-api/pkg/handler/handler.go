package handler

import (
	"auction-api/pkg/service"
	"github.com/gin-gonic/gin"
)

type Handler struct {
	services *service.Service
}

func NewHandler(services *service.Service) *Handler {
	return &Handler{services: services}
}

func (h *Handler) InitRoutes() *gin.Engine {
	router := gin.New()
	auth := router.Group("/auth")
	{
		auth.POST("/sign-up", h.signUp)
		auth.POST("/sign-in", h.signIn)
		auth.POST("/logout", h.logout)
	}
	product := router.Group("/product")
	{
		product.GET("/", h.getAllProducts)
		product.GET("/:id", h.getProductByID)
		product.POST("/", h.createProduct)
		product.PUT("/:id", h.updateProduct)
		product.DELETE("/:id", h.deleteProduct)
	}
	category := router.Group("/category")
	{
		category.POST("/", h.createCategory)
		category.GET("/", h.getAllCategories)
		category.GET("/:id", h.getProductsByCategoryId)
	}
	api := router.Group("/api", h.userIdentity)
	{
		api.POST("/", h.user)
		api.GET("/role", h.getRole)

	}
	return router
}
