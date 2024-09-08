// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Load external HTML content
    fetch('html/editors.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('editorCards').innerHTML = data;

            // Initialize event listeners for editor cards
            document.querySelectorAll('.editor-card').forEach(card => {
                card.addEventListener('click', function() {
                    // Toggle 'selected' class on the clicked card
                    this.classList.toggle('selected');
                    
                    // Get all selected editors
                    const selectedEditors = Array.from(document.querySelectorAll('.editor-card.selected'))
                        .map(card => card.getAttribute('data-editor'));

                    // Update table rows based on selected editors
                    document.querySelectorAll('#changesTable tbody tr').forEach(row => {
                        const editors = row.querySelector('td[data-editors]').getAttribute('data-editors').split(', ');
                        
                        if (selectedEditors.length === 0) {
                            // Show all editors' names if no card is selected
                            row.querySelector('td[data-editors]').textContent = editors.join(', ');
                            row.style.display = '';
                        } else {
                            // Filter out only the selected editors from the cell's data
                            const filteredEditors = editors.filter(editor => selectedEditors.includes(editor));
                            
                            // Update the "Editors" column to show only the selected editors
                            const editorsCell = row.querySelector('td[data-editors]');
                            editorsCell.textContent = filteredEditors.join(', ');

                            // Show or hide row based on selected editors
                            if (filteredEditors.length > 0) {
                                row.style.display = '';
                            } else {
                                row.style.display = 'none';
                            }
                        }
                    });
                });
            });
        })
        .catch(error => console.error('Error loading editors:', error));

    fetch('html/table.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('changesSection').innerHTML = data;
        })
        .catch(error => console.error('Error loading table:', error));

    // Handle toggle button click to show/hide editor cards
    document.getElementById('toggleButton').addEventListener('click', function() {
        const editorCards = document.getElementById('editorCards');
        if (editorCards.classList.contains('hidden')) {
            editorCards.classList.remove('hidden');
            this.textContent = 'Hide Editors';
        } else {
            editorCards.classList.add('hidden');
            this.textContent = 'Show Editors';
        }
    });
});
