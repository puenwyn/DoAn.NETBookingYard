create database QLDATSANTHETHAO
use QLDATSANTHETHAO

CREATE TABLE USERS
(
	Id int Identity(1,1) primary key,
	Username varchar(50),
	HashedPassword varchar(1024),
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
	Id int Identity(1,1) primary key,
	Name nvarchar(50),
	IsDelete smallint,
)

CREATE TABLE YARDS
(
	Id int Identity(1,1) primary key,
	YardType int,
	Name nvarchar(255),
	NameTransformed varchar(255),
	Address nvarchar(500),
	Description nvarchar(1024),
	Owner int,
	Amenity int,
	IsDelete smallint
)

CREATE TABLE YARD_IMAGE 
(
	Id int Identity(1,1),
	YardId int,
	ImageURL nvarchar(1024),
	CONSTRAINT PK_YARD_IMAGE primary key (Id, YardId)
)

CREATE TABLE YARD_DETAIL
(
	Id int Identity(1,1) primary key,
	YardId int,
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
	Id int Identity(1,1) primary key,
	Name nvarchar(50),
	Icon nvarchar(50),
	IsDelete smallint
)

CREATE TABLE AMENITIES_OF_YARD 
(
	YardId int Identity(1,1),
	AmenityId int,
	constraint PK_AMENITIES_OF_YARD primary key (YardId, AmenityId)
)

CREATE TABLE BOOKINGS
(
	Id int Identity(1,1) primary key,
	UserId int,
	Yard int,
	StartTime datetime,
	EndTime datetime,
	Status nvarchar(10),
	Note nvarchar(500),
	QRCode nvarchar(500),
	IsDelete smallint
)

CREATE TABLE RATINGS
(
	Id int Identity(1,1) primary key,
	UserId int,
	Yard int,
	Rating int,
	Comment nvarchar(1024),
	RatingId int,
	CreateAt datetime,
	IsDelete smallint,
)

CREATE TABLE VOUCHERS
(
	Id int Identity(1,1) primary key,
	Name nvarchar(100),
	Type nvarchar(100),
	Discount float,
	StartDate datetime,
	EndDate datetime,
	IsDelete smallint
)

CREATE TABLE PAYMENTS
(
	Id int Identity(1,1) primary key,
	BookingIds nvarchar(100),
	PaymentMethod nvarchar(100),
	PaymentDate datetime,
	VoucherId int,
	Total float,
	IsDelete smallint
)

CREATE TABLE WISHLIST
(
	UserId int,
	Yard int,
	CONSTRAINT PK_WISHLIST primary key (UserId, Yard)
)

CREATE TABLE OWNERS
(
	Id int Identity(1,1) primary key,
	Username varchar(50),
	HashedPassword varchar(1024),
	FullName nvarchar(100),
	DateOfBirth date,
	Address nvarchar(500),
	PhoneNumber char(10),
	Gender smallint,
	IsLocked smallint,
)

ALTER TABLE YARDS ADD CONSTRAINT FK_YARDS_TYPE FOREIGN KEY (YardType) REFERENCES YARD_TYPES(Id)
ALTER TABLE YARDS ADD CONSTRAINT FK_YARDS_OWNER FOREIGN KEY (Id) REFERENCES OWNERS(Id)

ALTER TABLE YARD_IMAGE ADD CONSTRAINT FK_IMAGE_YARD FOREIGN KEY (YardId) REFERENCES YARDS(Id)

ALTER TABLE YARD_DETAIL ADD CONSTRAINT FK_DETAIL_YARD FOREIGN KEY (YardId) REFERENCES YARDS(Id)

ALTER TABLE AMENITIES_OF_YARD ADD CONSTRAINT FK_AMENITY_YARD FOREIGN KEY (YardId) REFERENCES YARDS(Id)
ALTER TABLE AMENITIES_OF_YARD ADD CONSTRAINT FK_AMENITY_AMENITY FOREIGN KEY (AmenityId) REFERENCES AMENITIES(Id)

ALTER TABLE BOOKINGS ADD CONSTRAINT FK_BOOKING_USER FOREIGN KEY (UserId) REFERENCES USERS(Id)
ALTER TABLE BOOKINGS ADD CONSTRAINT FK_BOOKING_YARD FOREIGN KEY (Yard) REFERENCES YARD_DETAIL(Id)

ALTER TABLE RATINGS ADD CONSTRAINT FK_RATING_USER FOREIGN KEY (UserId) REFERENCES USERS(Id)
ALTER TABLE RATINGS ADD CONSTRAINT FK_RATING_YARD FOREIGN KEY (Yard) REFERENCES YARDS(Id)

ALTER TABLE PAYMENTS ADD CONSTRAINT FK_PAYMENT_VOUCHER FOREIGN KEY (VoucherId) REFERENCES VOUCHERS(Id)

ALTER TABLE WISHLIST ADD CONSTRAINT FK_WISHLIST_USER FOREIGN KEY (UserId) REFERENCES USERS(Id)
ALTER TABLE WISHLIST ADD CONSTRAINT FK_WISHLIST_YARD FOREIGN KEY (Yard) REFERENCES YARDS(Id)


