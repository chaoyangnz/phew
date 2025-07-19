REM this batch script is used by conveniently setting phew args

@echo off

REM edit the below line to set parameters, %1 is the input file
START /MIN %~dp0\phew.exe card %1

%SystemRoot%\explorer.exe %~dp1
