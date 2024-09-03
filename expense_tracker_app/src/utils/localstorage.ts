/**
 * # GET || SET || REMOVE Data LocalStorage
 * ### - Example Get Data :  LOCALDATA("customer_id")
 * ### - Example Set Data :  LOCALDATA("customer_id","xxxx")
 * ### - Example Remover key-value localstorage :  LOCALDATA("customer_id",null,true)
 * @param name : Key localstorage
 * @param value : Value localstorage, if not set data localstorage => : null, undefiend
 * @param isRemove : boolean : if not remove data localstorage => : false, undefiend
 * @returns
 */
export const LOCALDATA = (
	name: "user" | "transactions",
	value?: string | null | undefined,
	isRemove?: boolean,
) => {
	if (value) {
		localStorage.setItem(name, value)
		return null
	} else if (isRemove) {
		localStorage.removeItem(name)
		return null
	} else {
		let _result = localStorage.getItem(name)
		if (!_result) return null
		if (_result.startsWith('"') && _result.endsWith('"')) {
			_result = _result.slice(1, -1).replace(/["\\]/g, "'")
		}
		return _result
	}
}
