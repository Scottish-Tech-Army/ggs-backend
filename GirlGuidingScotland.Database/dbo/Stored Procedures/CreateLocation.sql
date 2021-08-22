CREATE PROCEDURE [dbo].[CreateLocation]
    @Name NVARCHAR(50), 
    @Description NVARCHAR(MAX), 
    @Latitude FLOAT, 
    @Longitude FLOAT 
AS
	INSERT INTO Locations( Name, Description, Latitude, Longitude)
	VALUES ( @Name, @Description, @Latitude, @Longitude)
RETURN 
