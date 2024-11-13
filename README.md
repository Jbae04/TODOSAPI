# TODOSAPI
 This is an assignment for 317






Here are the commands to run the application:

npm start: 

# View all todos
Invoke-WebRequest -Uri "http://localhost:3000/todos" -Method GET | Select-Object -ExpandProperty Content
# Create a high priority todo
$body = @{
    task = "Complete homework"
    priority = "high"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/todos" `
    -Method POST `
    -Body $body `
    -ContentType "application/json" | Select-Object -ExpandProperty Content
# Create a medium priority todo
$body = @{
    task = "Read documentation"
    priority = "medium"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/todos" `
    -Method POST `
    -Body $body `
    -ContentType "application/json" | Select-Object -ExpandProperty Content
# Mark all todos as completed
Invoke-WebRequest -Uri "http://localhost:3000/todos/complete-all" `
    -Method PUT | Select-Object -ExpandProperty Content

# View all todos to verify they're completed
Invoke-WebRequest -Uri "http://localhost:3000/todos" -Method GET | Select-Object -ExpandProperty Content
# View only completed todos
Invoke-WebRequest -Uri "http://localhost:3000/todos?completed=true" -Method GET | Select-Object -ExpandProperty Content

# View only incomplete todos
Invoke-WebRequest -Uri "http://localhost:3000/todos?completed=false" -Method GET | Select-Object -ExpandProperty Content

# Update a specific todo (replace 1 with an actual todo ID)
$updateBody = @{
    task = "Updated task"
    priority = "low"
    completed = $true
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/todos/1" `
    -Method PUT `
    -Body $updateBody `
    -ContentType "application/json" | Select-Object -ExpandProperty Content
# Delete a specific todo (replace 1 with an actual todo ID)
Invoke-WebRequest -Uri "http://localhost:3000/todos/1" -Method DELETE
