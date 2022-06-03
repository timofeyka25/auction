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
		auth.POST("/change-pwd", h.changePassword)
	}
	category := router.Group("/category")
	{
		category.GET("/", h.getAllCategories)
		category.GET("/:id", h.getProductsByCategoryId)
	}
	api := router.Group("/api", h.userIdentity)
	{
		product := api.Group("/product")
		{
			product.GET("/", h.getAllProducts)
			product.GET("/:id", h.getProductByID)
			product.GET("/bid/:id", h.getProductBids)
		}
		bid := api.Group("/bid")
		{
			bid.POST("/", h.newBid)
			bid.GET("/", h.getUserBids)
			bid.GET("/:id", h.getUserProductBids)
		}
		staff := api.Group("/", h.staffIdentity)
		{
			product := staff.Group("product")
			{
				product.POST("/", h.createProduct)
				product.PUT("/:id", h.updateProduct)
				product.DELETE("/:id", h.deleteProduct)
			}
			staff.POST("/category/", h.createCategory)
		}
		admin := api.Group("/", h.adminIdentity)
		{
			admin.POST("new-admin", h.newAdmin)
			admin.POST("new-staff", h.newStaff)
			admin.POST("new-client", h.newClient)
			admin.POST("deactivate", h.deactivateUser)
			admin.POST("activate", h.activateUser)
			admin.GET("clients", h.getClients)
			admin.GET("staff", h.getStaff)
			admin.GET("admins", h.getAdmins)
		}
		api.POST("/", h.user)
		api.GET("/role", h.getRole)
	}
	return router
}
