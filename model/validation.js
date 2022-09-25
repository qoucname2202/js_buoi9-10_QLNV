function Validation() {
	// Check empty input
	this.hasEmptyInput = (val, id, mess) => {
		if (val.trim().length === 0) {
			document.getElementById(id).innerHTML = mess;
			document.getElementById(id).style.display = 'block';
			return false;
		}
		document.getElementById(id).innerHTML = '';
		document.getElementById(id).style.display = 'none';
		return true;
	};
	// Check account is number
	this.isNumber = (val, id, mess) => {
		if (val.match(/^[0-9]+$/)) {
			document.getElementById(id).innerHTML = '';
			document.getElementById(id).style.display = 'none';
			return true;
		}
		document.getElementById(id).innerHTML = mess;
		document.getElementById(id).style.display = 'block';
		return false;
	};
	// Account [4,6]
	this.checkLengthItem = (val, id, mess, min, max) => {
		if (val.length >= min && val.length <= max) {
			document.getElementById(id).innerHTML = '';
			document.getElementById(id).style.display = 'none';
			return true;
		}
		document.getElementById(id).innerHTML = mess;
		document.getElementById(id).style.display = 'block';
		return false;
	};
	// Check salary
	this.checkNumbItem = (val, id, mess, min, max) => {
		if (val >= min && val <= max) {
			document.getElementById(id).innerHTML = '';
			document.getElementById(id).style.display = 'none';
			return true;
		}
		document.getElementById(id).innerHTML = mess;
		document.getElementById(id).style.display = 'block';
		return false;
	};

	// Name is character
	this.checkName = (val, id, mess) => {
		const leter =
			'^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ' +
			'ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ' +
			'ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$';
		if (val.trim().match(leter)) {
			document.getElementById(id).innerHTML = '';
			document.getElementById(id).style.display = 'none';
			return true;
		}
		document.getElementById(id).innerHTML = mess;
		document.getElementById(id).style.display = 'block';
		return false;
	};
	// Check Email is Format
	this.checkEmail = (val, id, mess) => {
		if (val.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
			document.getElementById(id).innerHTML = '';
			document.getElementById(id).style.display = 'none';
			return true;
		}
		document.getElementById(id).innerHTML = mess;
		document.getElementById(id).style.display = 'block';
		return false;
	};
	// Password contain [6-10]
	this.checkPass = (val, id, mess) => {
		if (
			val.match(
				/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/,
			)
		) {
			document.getElementById(id).innerHTML = '';
			document.getElementById(id).style.display = 'none';
			return true;
		}
		document.getElementById(id).innerHTML = mess;
		document.getElementById(id).style.display = 'block';
		return false;
	};
	// Checked selected
	this.checkSelected = (idSelected, divError, mess) => {
		if (getEle(idSelected).selectedIndex !== 0) {
			document.getElementById(divError).innerHTML = '';
			document.getElementById(divError).style.display = 'none';
			return true;
		}
		document.getElementById(divError).innerHTML = mess;
		document.getElementById(divError).style.display = 'block';
		return false;
	};

	//
	this.checkAccount = (val, divError, mess, arr) => {
		let isExits = false;
		for (let i = 0; i < arr.length; i++) {
			const staff = arr[i];
			if (staff.account === val) {
				isExits = true;
				break;
			}
		}
		if (isExits) {
			document.getElementById(divError).innerHTML = mess;
			document.getElementById(divError).style.display = 'block';
			return false;
		}
		document.getElementById(divError).innerHTML = '';
		document.getElementById(divError).style.display = 'none';
		return true;
	};
}
