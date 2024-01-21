import React, {useReducer} from "react";

const initialState = {
	showModal: false,
  	modalContent: "",
  	isMainView: true
}

const reducer = (state, action) => {
	switch(action.type) {
		case "setShowModal":
			return {...state, showModal: action.payload}
		case "setModalContent":
			return {...state, modalContent: action.payload}
		case "setIsMainView":
			return {...state, isMainView: action.payload}
		default:
			return state
	}
}

const useHooksLogic = () => {
	const [state, dispatch] = useReducer(reducer, initialState)
	return [state, dispatch]
}

export default useHooksLogic
