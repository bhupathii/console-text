# Test Console.text API
$uri = "http://localhost:3000/api/messages"
$headers = @{
    "Content-Type" = "application/json"
    "Authorization" = "Bearer ct_92fd44bef90dd9bafa24509c37c2d70f"
}
$body = @{
    message = "PowerShell API test"
    severity = "info"
    projectId = "console-text-test"
    environment = "development"
    timestamp = [DateTimeOffset]::Now.ToUnixTimeMilliseconds()
} | ConvertTo-Json

Write-Host "Testing Console.text API..."
Write-Host "URI: $uri"
Write-Host "Body: $body"
Write-Host ""

try {
    $response = Invoke-WebRequest -Uri $uri -Method POST -Headers $headers -Body $body
    Write-Host "✅ Success!"
    Write-Host "Status Code: $($response.StatusCode)"
    Write-Host "Response: $($response.Content)"
} catch {
    Write-Host "❌ Error:"
    Write-Host "Status Code: $($_.Exception.Response.StatusCode.value__)"
    Write-Host "Status Description: $($_.Exception.Response.StatusDescription)"
    Write-Host "Response: $($_.Exception.Response)"
    
    # Try to read the response body
    if ($_.Exception.Response) {
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response Body: $responseBody"
    }
} 