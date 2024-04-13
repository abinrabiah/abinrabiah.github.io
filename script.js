

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



// document.addEventListener("DOMContentLoaded", function() {
//   // This function will run after the document is fully loaded
//   const smoothScrollLinks = document.querySelectorAll('a[href^="#"]'); // Selects all links that begin with #

//   smoothScrollLinks.forEach(link => {
//       link.addEventListener('click', function(e) {
//           e.preventDefault(); // Prevent the default anchor click behavior
//           const targetId = this.getAttribute('href'); // Get the href attribute of the clicked link
//           const targetSection = document.querySelector(targetId); // Get the section that the link points to

//           if (targetSection) {
//               // Use the scrollIntoView method to smoothly scroll to the section
//               targetSection.scrollIntoView({
//                   behavior: 'smooth', // Specifies that the scrolling should be smooth
//                   block: 'start' // Aligns the block at the start (top) of the viewport if possible
//               });
//           }
//       });
//   });
// });

function smoothScrollTo(element, duration, offset = 0) {
  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function easeInOutQuad(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

document.addEventListener("DOMContentLoaded", function() {
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  const headerHeight = document.querySelector('.fixed-top').offsetHeight; // Adjust this selector based on your HTML

  smoothScrollLinks.forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          const targetSection = document.querySelector(targetId);

          if (targetSection) {
              smoothScrollTo(targetSection, 600, headerHeight); // Now passing the header height as an offset
          }
      });
  });
});
