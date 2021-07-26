CREATE PROCEDURE [dbo].[Mock_GetPerson]
	@personId int
AS
	SELECT * FROM Person
	WHERE PersonId = @personId
RETURN
