# Set output file
$outputFile = "merged_output.cpp"

# Clear the output file if it exists
if (Test-Path $outputFile) {
    Remove-Item $outputFile
}

# Define folders to scan
$folders = @("src", "tests", "bin")

foreach ($folder in $folders) {
    Get-ChildItem -Path $folder -File | Where-Object { $_.Name -ne "catch.hpp" } | ForEach-Object {
        Add-Content -Path $outputFile -Value "// $($_.Name)"
        Add-Content -Path $outputFile -Value (Get-Content $_.FullName -Raw)
        Add-Content -Path $outputFile -Value "`n"  # newline
    }
}

Write-Host "Files merged into $outputFile"
