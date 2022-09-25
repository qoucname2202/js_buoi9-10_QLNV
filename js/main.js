const getEle = id => {
	return document.getElementById(id);
};
// Format datetime
const formatDateTime = str => {
	const value = new Date(str);
	const year = value.getFullYear();
	let month = value.getMonth() + 1;
	let day = value.getDate();
	if (day < 10) day = '0' + day;
	if (month < 10) month = '0' + month;
	return `${day}/${month}/${year}`;
};
let DSNV = new EmployeeList();
let validation = new Validation();
// get list employee
const getInfoEmployee = isUpdate => {
	const _taiKhoan = getEle('tknv').value;
	const _hoTen = getEle('name').value;
	const _email = getEle('email').value;
	const _matKhau = getEle('password').value;
	const _ngayLam = getEle('datepicker').value;
	const _luongCB = parseFloat(getEle('luongCB').value);
	const _chucVu = getEle('chucvu').value;
	const _gioLam = parseFloat(getEle('gioLam').value);
	var isValid = true;
	// Validation account
	if (isUpdate) {
		isValid &=
			validation.hasEmptyInput(
				_taiKhoan,
				'tbTKNV',
				`Vui lòng nhập tài khoản`,
			) &&
			validation.isNumber(_taiKhoan, 'tbTKNV', 'Vui lòng nhập số') &&
			validation.checkLengthItem(_taiKhoan, 'tbTKNV', 'Độ dài từ 4-6', 4, 6) &&
			validation.checkAccount(
				_taiKhoan,
				'tbTKNV',
				`Mã nhân viên đã tồn tại`,
				DSNV.employeeList,
			);
	}
	// Validation name
	isValid &=
		validation.hasEmptyInput(_hoTen, 'tbTen', `Vui lòng nhập tên`) &&
		validation.checkName(_hoTen, 'tbTen', `Vui lòng nhập chữ`);
	// Validation email
	isValid &=
		validation.hasEmptyInput(_email, 'tbEmail', `Vui lòng nhập email`) &&
		validation.checkEmail(_email, 'tbEmail', `Email không đúng định dạng`);
	// Validation password
	isValid &=
		validation.hasEmptyInput(_matKhau, 'tbMatKhau', `Vui lòng nhập mật khẩu`) &&
		validation.checkPass(_matKhau, 'tbMatKhau', `Mật khẩu không hợp lệ`);
	// Validation work days
	isValid &= validation.hasEmptyInput(
		_ngayLam,
		'tbNgay',
		`Vui lòng nhập ngày làm`,
	);
	// Validation Lương CB
	isValid &=
		validation.hasEmptyInput(
			getEle('luongCB').value,
			'tbLuongCB',
			`Vui lòng nhập lương CB`,
		) &&
		validation.checkNumbItem(
			getEle('luongCB').value,
			'tbLuongCB',
			`Lương CB từ 1M - 20M`,
			1000000,
			20000000,
		);
	// Validation position
	isValid &= validation.checkSelected(
		'chucvu',
		'tbChucVu',
		`Vui lòng chọn chức vụ`,
	);
	// Validation worktime
	isValid &=
		validation.hasEmptyInput(
			getEle('gioLam').value,
			'tbGiolam',
			`Vui lòng nhập giờ làm`,
		) &&
		validation.checkNumbItem(
			getEle('gioLam').value,
			'tbGiolam',
			`Giờ làm không hợp lệ`,
			80,
			200,
		);
	if (isValid) {
		let employee = new Employee(
			_taiKhoan,
			_hoTen,
			_email,
			_matKhau,
			_ngayLam,
			_luongCB,
			_chucVu,
			_gioLam,
		);
		employee.calcBasicSalary();
		employee.employeeRating();
		return employee;
	}
	return null;
};

getEle('btnDong').addEventListener('click', e => {
	e.preventDefault();
	const arr = [
		'tbTKNV',
		'tbTen',
		'tbEmail',
		'tbMatKhau',
		'tbNgay',
		'tbLuongCB',
		'tbChucVu',
		'tbGiolam',
	];
	arr.forEach(item => {
		getEle(item).style.display = 'none';
	});
});

const getLocalStorage = () => {
	if (localStorage.getItem('employeeList')) {
		let value = JSON.parse(localStorage.getItem('employeeList'));
		DSNV.employeeList = value;
		renderEmployeeList();
	}
};

// Deleted staff
const deleteStaff = account => {
	DSNV.deleteEmployee(account.toString());
	localStorage.setItem('employeeList', JSON.stringify(DSNV.employeeList));
	renderEmployeeList();
};

const editStaff = id => {
	const idx = DSNV.employeeList.findIndex(
		item => item.account === id.toString(),
	);
	if (idx !== -1) {
		let {
			account,
			fullName,
			email,
			password,
			workDay,
			basicSalary,
			position,
			workTime,
		} = DSNV.employeeList[idx];
		getEle('tknv').value = account;
		getEle('name').value = fullName;
		getEle('email').value = email;
		getEle('password').value = password;
		getEle('datepicker').value = workDay;
		getEle('luongCB').value = basicSalary;
		getEle('chucvu').value = position;
		getEle('gioLam').value = workTime;
	}
	// edit tittle
	getEle('header-title').innerHTML = `Cập nhật NV`;
	// disbale input
	getEle('tknv').disabled = true;
	//
	getEle('btnCapNhat').style.display = 'block';
	// hidden button add employee
	getEle('btnThemNV').style.display = 'none';
};

const renderEmployeeList = () => {
	let content = '';
	DSNV.employeeList.forEach(item => {
		content += `
      <tr>
        <td>${item.account}</td>
        <td>${item.fullName}</td>
        <td>${item.email}</td>
        <td>${formatDateTime(item.workDay)}</td>
        <td>${item.position}</td>
        <td>${item.totalSalary}</td>
        <td>${item.rating}</td>
        <td>
          <button class="btn btn-info" onclick="editStaff(${
						item.account
					})" data-toggle="modal" data-target="#myModal">
            <i class="fa fa-edit"></i>
          </button>
          <button class="btn btn-danger"
          onclick="deleteStaff(${item.account})">
           <i class="fa fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
	});
	getEle('tableDanhSach').innerHTML = content;
};
getEle('btnThem').addEventListener('click', e => {
	// edit title
	getEle('header-title').innerHTML = `Thêm NV`;
	// hidden button add employee
	getEle('btnCapNhat').style.display = 'none';
	getEle('btnThemNV').style.display = 'block';
	getEle('tknv').disabled = false;
	// set form
	getEle('myForm').reset();
});
// add employee
getEle('btnThemNV').addEventListener('click', e => {
	e.preventDefault();
	// add employee
	const employee = getInfoEmployee(true);
	if (employee) {
		DSNV.addEmployee(employee);
		// save local
		localStorage.setItem('employeeList', JSON.stringify(DSNV.employeeList));
		// load table
		renderEmployeeList();
	}
});
// update employee
getEle('btnCapNhat').addEventListener('click', e => {
	e.preventDefault();
	// Get value staff updated
	const employee = getInfoEmployee(false);
	if (employee) {
		DSNV.updateEmployee(employee.account, employee);
		// load table
		renderEmployeeList();
	}
});
// Remove vietnamese
function removeAccents(str) {
	var from =
			'àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ',
		to =
			'aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy';
	for (var i = 0, l = from.length; i < l; i++) {
		str = str.replace(RegExp(from[i], 'gi'), to[i]);
	}
	str = str
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9\-]/g, '-')
		.replace(/-+/g, '-');
	return str;
}
// Search
const searchRating = () => {
	const value = getEle('searchName').value;
	const newList = DSNV.employeeList.filter(
		item => removeAccents(item.rating) === removeAccents(value),
	);
	if (value.length !== 0) {
		let content = '';
		newList.forEach(item => {
			content += `
      <tr>
        <td>${item.account}</td>
        <td>${item.fullName}</td>
        <td>${item.email}</td>
        <td>${formatDateTime(item.workDay)}</td>
        <td>${item.position}</td>
        <td>${item.totalSalary.toLocaleString('en-US', {
					style: 'currency',
					currency: 'VND',
				})}</td>
        <td>${item.rating}</td>
        <td>
          <button class="btn btn-info" onclick="editStaff(${
						item.account
					})" data-toggle="modal" data-target="#myModal">
            <i class="fa fa-edit"></i>
          </button>
          <button class="btn btn-danger"
          onclick="deleteStaff(${item.account})">
           <i class="fa fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
		});
		getEle('tableDanhSach').innerHTML = content;
	} else {
		getLocalStorage();
	}
};
//
getLocalStorage();
