import request from "../../utils/request";

export const getCategoryList = () => request({
	url: "/categories"
})