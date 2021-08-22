CREATE TABLE [dbo].[UnitLocations]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [UnitId] INT NOT NULL, 
    [LocationId] INT NOT NULL, 
    CONSTRAINT [FK_UnitLocations_Units] FOREIGN KEY ([UnitId]) REFERENCES [Units]([Id]), 
    CONSTRAINT [FK_UnitLocations_Locations] FOREIGN KEY ([LocationId]) REFERENCES [Locations]([Id])
)
