

  document.addEventListener('DOMContentLoaded', function() {
    // Existing collapsible code
    document.body.addEventListener('click', function(e) {
      if (e.target.classList.contains('collapsible')) {
        e.target.classList.toggle("active");
        var content = e.target.nextElementSibling;
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      }
    });
  
    // Copy button functionality
    var copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var copyTarget = document.querySelector(this.getAttribute('data-copy-target'));
        var range = document.createRange();
        range.selectNode(copyTarget);
        window.getSelection().addRange(range);
  
        try {
          var successful = document.execCommand('copy');
          var msg = successful ? 'successful' : 'unsuccessful';
          console.log('Copy command was ' + msg);
        } catch (err) {
          console.log('Oops, unable to copy');
        }
  
        window.getSelection().removeAllRanges();
      });
    });

  
    var copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var copyTarget = document.querySelector(this.getAttribute('data-copy-target'));
            var range = document.createRange();
            range.selectNode(copyTarget);
            window.getSelection().addRange(range);

            try {
                var successful = document.execCommand('copy');
                if (successful) {
                    // Change button text to indicate copying
                    var originalText = this.textContent;
                    this.textContent = 'Copied!';
                    
                    // Revert the button text back after 2 seconds
                    setTimeout(() => {
                        this.textContent = originalText;
                    }, 2000);
                }
            } catch (err) {
                console.log('Oops, unable to copy');
            }

            window.getSelection().removeAllRanges();
        });
    });
});
