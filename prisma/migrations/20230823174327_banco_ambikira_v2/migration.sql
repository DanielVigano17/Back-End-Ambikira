BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [cpf] NVARCHAR(1000) NOT NULL,
    [tel] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email]),
    CONSTRAINT [User_cpf_key] UNIQUE NONCLUSTERED ([cpf])
);

-- CreateTable
CREATE TABLE [dbo].[Estande] (
    [id] INT NOT NULL IDENTITY(1,1),
    [estande] NVARCHAR(1000) NOT NULL,
    [autorId] INT NOT NULL,
    [time] INT NOT NULL,
    [pontos] INT NOT NULL,
    CONSTRAINT [Estande_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Estande_autorId_estande_key] UNIQUE NONCLUSTERED ([autorId],[estande])
);

-- AddForeignKey
ALTER TABLE [dbo].[Estande] ADD CONSTRAINT [Estande_autorId_fkey] FOREIGN KEY ([autorId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
