function Employee(
	_taiKhoan,
	_hoTen,
	_email,
	_matKhau,
	_ngayLam,
	_luongCB,
	_chucVu,
	_gioLam,
) {
	this.account = _taiKhoan;
	this.fullName = _hoTen;
	this.email = _email;
	this.password = _matKhau;
	this.workDay = _ngayLam;
	this.basicSalary = _luongCB;
	this.position = _chucVu;
	this.workTime = _gioLam;
	this.totalSalary = 0;
	this.rating = '';

	this.calcBasicSalary = () => {
		if (this.position === 'Sếp') {
			this.totalSalary = this.basicSalary * 3;
		} else if (this.position === 'Trưởng phòng') {
			this.totalSalary = this.basicSalary * 2;
		} else {
			this.totalSalary = this.basicSalary;
		}
	};

	this.employeeRating = () => {
		if (this.workTime >= 192) {
			this.rating = 'Xuất sắc';
		} else if (this.workTime >= 176 && this.workTime < 192) {
			this.rating = 'Giỏi';
		} else if (this.workTime >= 160 && this.workTime < 176) {
			this.rating = 'Khá';
		} else {
			this.rating = 'Trung bình';
		}
	};
}
