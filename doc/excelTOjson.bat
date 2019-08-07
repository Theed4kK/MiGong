@SET EXCEL_FOLDER=.\ÅäÖÃ
@SET JSON_FOLDER=.\..\resource\gameConfig
@SET EXE=.\×ª»»¹¤¾ß\excel2json.exe

@ECHO Converting excel files in folder %EXCEL_FOLDER% ...
for /f "delims=" %%i in ('dir /b /a-d /s %EXCEL_FOLDER%\*.xlsx') do (
    @echo   processing %%~nxi 
    @CALL %EXE% --excel %EXCEL_FOLDER%\%%~nxi --json %JSON_FOLDER%\%%~ni.json --header 3 --encoding utf8-nobom --array true --lowcase true
)

pause