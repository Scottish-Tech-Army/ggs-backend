CREATE PROCEDURE [dbo].[GetLocation]
	@locationId int
AS
	SELECT * FROM Locations
	WHERE Id = @locationId
RETURN