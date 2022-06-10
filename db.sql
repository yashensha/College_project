-- table students

CREATE TABLE hostel.students (
	id INT auto_increment NOT NULL,
	name varchar(100) NOT NULL,
    dept varchar(100) NOT NULL,
    year_joined DATE NOT NULL,
    address varchar(155) NOT NULL,
    mobile VARCHAR(20) NOT NULL,
    guardian_name varchar(100) NOT NULL,
    guardian_contact VARCHAR(20) NOT NULL,
    adm_no INT NOT NULL,
    is_active BOOL NOT NULL,
    	CONSTRAINT students_PK PRIMARY KEY (id)
)



-- table attendance

CREATE TABLE hostel.attendance (
	id INT auto_increment NOT NULL,
    user_id INT NOT NULL,
    datetime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
    date_only DATE NOT NULL DEFAULT (CURRENT_DATE()),
	CONSTRAINT attendance_PK PRIMARY KEY (id),
	CONSTRAINT day UNIQUE (user_id,date_only),
	CONSTRAINT user_id FOREIGN KEY (user_id)
	REFERENCES students(id)
)

-- add to students

INSERT INTO hostel.students ( `name`, `dept`, `year_joined`, `address`, `mobile`, `guardian_name`, `guardian_contact`, `adm_no`, `is_active`) VALUES ( 'kadher JR', 'CT', '2022-06-07', 'veed', '9888754666', 'KADHER SR.', '9888754666', '4512', '1');


--  add to attendance
INSERT INTO hostel.attendance (user_id)
	VALUES (5);

