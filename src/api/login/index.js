import request from "../../utils/request";

export const loginAPI = ({ code, encryptedData, iv, rawData, signature}) => request({
	method: "POST",
	url: "/users/wxlogin",
	data: {
		code,
		encryptedData,
		iv,
		rawData,
		signature
	}
})