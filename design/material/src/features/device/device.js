document.getElementById('device-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const type = document.getElementById('type').value;
    const procuredBy = document.getElementById('procured_by').value;
    const managedBy = document.getElementById('managed_by').value;

    console.log('Submitting Device Info:', { type, procuredBy, managedBy });
    // Here you might send data to the server or handle it according to your application's needs
});
