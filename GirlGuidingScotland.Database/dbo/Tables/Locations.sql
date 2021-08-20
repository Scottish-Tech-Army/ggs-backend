CREATE TABLE [dbo].[Locations]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [Name] NVARCHAR(50) NOT NULL, 
    [Description] NVARCHAR(MAX) NULL, 
    [lat] FLOAT NOT NULL, 
    [lng] FLOAT NOT NULL
)
