function EmployeeList() {
	this.employeeList = [];

	this.addEmployee = staff => {
		this.employeeList.push(staff);
	};

	this.updateEmployee = (id, staffUpdate) => {
		const idx = this.employeeList.findIndex(item => item.account === id);
		if (idx !== -1) {
			this.employeeList[idx] = staffUpdate;
		}
		localStorage.setItem('employeeList', JSON.stringify(this.employeeList));
	};

	this.deleteEmployee = accountStaff => {
		const idx = this.employeeList.findIndex(
			item => item.account === accountStaff,
		);
		if (idx !== -1) {
			this.employeeList.splice(idx, 1);
		}
	};
}
