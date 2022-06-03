package handler

import (
	auction "auction-api"
	"github.com/gin-gonic/gin"
	"net/http"
)

func (h *Handler) signUp(c *gin.Context) {
	var input auction.User

	if err := c.BindJSON(&input); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	id, err := h.services.Authorization.CreateUser(input)
	if err != nil {
		newErrorResponse(c, http.StatusConflict, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"id": id,
	})
}

type signInInput struct {
	Username string `json:"Username" binding:"required"`
	Password string `json:"Password" binding:"required"`
}

func (h *Handler) signIn(c *gin.Context) {
	var input signInInput

	if err := c.BindJSON(&input); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	token, err := h.services.Authorization.GenerateToken(input.Username, input.Password)
	if err != nil {
		if err.Error() == "this account is no longer active" {
			newErrorResponse(c, http.StatusUnauthorized, err.Error())
			return
		}
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}
	roleId, err := h.services.Authorization.GetUserRole(input.Username, input.Password)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}
	roleId, err := h.services.Authorization.GetUserRole(input.Username, input.Password)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.SetSameSite(http.SameSiteStrictMode)
	c.SetCookie("jwt", token, 24*3600, "/", "localhost", true, true)
	c.JSON(http.StatusOK, map[string]interface{}{
		"token":   token,
		"role_id": roleId,
	})
}

func (h *Handler) logout(c *gin.Context) {
	c.SetCookie("jwt", "", -1, "/", "localhost", false, true)
	c.JSON(http.StatusOK, map[string]interface{}{
		"message": "success logout",
	})
}

type changePwdInput struct {
	Username    string `json:"username" binding:"required"`
	Password    string `json:"password" binding:"required"`
	NewPassword string `json:"new-password" binding:"required"`
}

func (h *Handler) changePassword(c *gin.Context) {
	var input changePwdInput

	if err := c.BindJSON(&input); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	err := h.services.ChangePassword(input.Username, input.Password, input.NewPassword)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, statusResponse{"Changed"})
}
