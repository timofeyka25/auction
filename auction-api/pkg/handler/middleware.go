package handler

import (
	"errors"
	"github.com/gin-gonic/gin"
	"net/http"
)

const (
	userCtx  = "userId"
	userRole = "roleId"
)

func (h *Handler) userIdentity(c *gin.Context) {
	cookie, err := c.Cookie("jwt")
	if err != nil {
		newErrorResponse(c, http.StatusUnauthorized, "unauthenticated "+err.Error())
		return
	}

	userId, roleId, err := h.services.ParseToken(cookie)
	if err != nil {
		newErrorResponse(c, http.StatusUnauthorized, err.Error())
		return
	}

	c.Set(userCtx, userId)
	c.Set(userRole, roleId)
}

func getUserId(c *gin.Context) (int, error) {
	id, ok := c.Get(userCtx)
	if !ok {
		return 0, errors.New("user id not found")
	}

	idInt, ok := id.(int)
	if !ok {
		return 0, errors.New("user id is of invalid type")
	}

	return idInt, nil
}

func getUserRole(c *gin.Context) (int, error) {
	role, ok := c.Get(userRole)
	if !ok {
		return 0, errors.New("role id not found")
	}

	roleId, ok := role.(int)
	if !ok {
		return 0, errors.New("role id is of invalid type")
	}

	return roleId, nil
}

func (h *Handler) user(c *gin.Context) {
	userId, err := getUserId(c)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}
	role, err := getUserRole(c)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"user id": userId,
		"role id": role,
	})
}

func (h *Handler) getRole(c *gin.Context) {
	role, err := getUserRole(c)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"role": role,
	})
}
