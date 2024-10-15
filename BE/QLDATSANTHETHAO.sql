create database QLDATSANTHETHAO
use QLDATSANTHETHAO

CREATE TABLE USERS
(
	Id int primary key,
	Username varchar(50),
	HashedPassword varchar(50),
	Email varchar(255),
	PhoneNumber char(10),
	FCMToken nvarchar(1024),
	FullName nvarchar(100),
	DateOfBirth date,
	Gender smallint,
	Address nvarchar(500),
	Role smallint,
)

CREATE TABLE YARD_TYPES 
(
	Id int primary key,
	Name nvarchar(50),
	IsDelete smallint,
)

CREATE TABLE YARDS
(
	Id int primary key,
	YardType int foreign key references YARD_TYPES,
	Name nvarchar(255),
	NameTransformed varchar(255),
	Address nvarchar(500),
	Description nvarchar(1024),
	Owner int foreign key references OWNERS,
	Amenity int,
	IsDelete smallint
)

CREATE TABLE YARD_IMAGE 
(
	Id int,
	YardId int foreign key references YARDS,
	ImageURL nvarchar(1024),
	CONSTRAINT PK_YARD_IMAGE primary key (Id, YardId)
)

CREATE TABLE YARD_DETAIL
(
	Id int primary key,
	YardId int foreign key references YARDS,
	Name nvarchar(255),
	Location nvarchar(50),
	Description nvarchar(1024),
	Capacity int,
	Price float,
	PricePeak float,
	IsDelete smallint
)

CREATE TABLE AMENITIES
(
	Id int primary key,
	Name nvarchar(50),
	Icon nvarchar(50),
	IsDelete smallint
)

CREATE TABLE AMENITIES_OF_YARD 
(
	YardId int foreign key references YARDS,
	AmenityId int foreign key references AMENITIES,
	constraint PK_AMENITIES_OF_YARD primary key (YardId, AmenityId)
)

CREATE TABLE BOOKINGS
(
	Id int primary key,
	User int foreign key references USERS,
	Yard int foreign key references YARD_DETAIL,
	StartTime datetime,
	EndTime datetime,
	Status nvarchar(10),
	Note nvarchar(500),
	QRCode nvarchar(500),
	IsDelete smallint
)

CREATE TABLE RATINGS
(
	Id int primary key,
	User int foreign key references USERS,
	Yard int foreign key references YARDS,
	Rating int,
	Comment nvarchar(1024),
	RatingId int foreign key references RATINGS,
	CreateAt datetime,
	IsDelete smallint,
)

CREATE TABLE VOUCHERS
(
	Id int primary key,
	Name nvarchar(100),
	Type nvarchar(100),
	Discount float,
	StartDate datetime,
	EndDate datetime,
	IsDelete smallint
)

CREATE TABLE PAYMENTS
(
	Id int primary key,
	BookingIds nvarchar(100),
	PaymentMethod nvarchar(100),
	PaymentDate datetime,
	VoucherId int foreign key references VOUCHERS,
	Total float,
	IsDelete smallint
)

CREATE TABLE WISHLIST
(
	User int foreign key references USERS,
	Yard int foreign key references YARDS,
	CONSTRAINT PK_WISHLIST primary key (User, Yard)
)

CREATE TABLE OWNERS
(
	Id int primary key,
	Username varchar(50),
	HashedPassword varchar(50),
	FullName nvarchar(100),
	DateOfBirth date,
	Address nvarchar(500),
	PhoneNumber char(10),
	Gender smallint,
	IsLocked smallint,
)

