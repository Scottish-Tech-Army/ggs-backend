CREATE PROC [dbo].[UpdateLocation]
    @Id int,
    @Name NVARCHAR(50), 
    @Description NVARCHAR(MAX), 
    @Latitude FLOAT, 
    @Longitude FLOAT 
AS
BEGIN
	UPDATE [Locations] SET [Name] = @Name, [Description] = @Description, [Latitude] = @Latitude, [Longitude] = @Longitude
    WHERE [Id] = @Id	 
END
