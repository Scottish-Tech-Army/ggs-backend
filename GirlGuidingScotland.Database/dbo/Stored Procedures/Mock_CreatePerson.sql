
CREATE PROCEDURE [dbo].[Mock_CreatePerson]
	@firstName nvarchar(50),
	@lastName nvarchar(50)
AS
	INSERT INTO Person (FirstName, LastName)
	VALUES (@firstName, @lastName)
RETURN