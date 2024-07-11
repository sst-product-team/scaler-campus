package utils

import (
	"crypto/rand"
	"math/big"
)

// GenerateSecurePassword generates a secure password of a given length
func GenerateSecurePassword(length int) (string, error) {
	const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}|;:,.<>?/"

	var password []byte
	for i := 0; i < length; i++ {
		randomInt, err := rand.Int(rand.Reader, big.NewInt(int64(len(charset))))
		if err != nil {
			return "", err
		}
		password = append(password, charset[randomInt.Int64()])
	}
	return string(password), nil
}
