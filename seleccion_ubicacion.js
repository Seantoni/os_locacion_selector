document.addEventListener('DOMContentLoaded', function() {
  const dealOptions = document.querySelectorAll('.deal-option');
  const locationModal = document.getElementById('locationModal');
  const closeModalBtn = document.getElementById('closeModal');
  const locationOptions = document.querySelectorAll('.location-option');
  const checkoutBtn = document.querySelector('.checkout-btn');
  const selectedLocationInfo = document.querySelector('.selected-location-info');
  const selectedLocationName = document.getElementById('selectedLocationName');
  const selectedLocationAddress = document.getElementById('selectedLocationAddress');
  const locationReminder = document.getElementById('locationReminder');
  
  // Modal deal summary elements
  const modalDealTitle = document.getElementById('modalDealTitle');
  const modalDealTag = document.getElementById('modalDealTag');
  const modalDealDescription = document.getElementById('modalDealDescription');
  const modalDealPrice = document.getElementById('modalDealPrice');
  const modalOriginalPrice = document.getElementById('modalOriginalPrice');
  const modalDealDiscount = document.getElementById('modalDealDiscount');
  const selectedDealSummary = document.getElementById('selectedDealSummary');
  const instructionLocationCount = document.getElementById('instructionLocationCount');
  const confirmLocationBtn = document.getElementById('confirmLocation');
  
  let locationSelected = false;
  let selectedDealOption = null;
  let selectedLocationElement = null;
  
  // Set location count
  const totalLocations = locationOptions.length;
  instructionLocationCount.textContent = totalLocations.toString();
  
  // Disable confirm button initially
  confirmLocationBtn.disabled = true;
  
  // If only one location, auto-select it and skip modal
  if (locationOptions.length === 1) {
    locationOptions[0].classList.add('selected');
    const name = locationOptions[0].querySelector('.location-option-name').textContent;
    const address = locationOptions[0].querySelector('.location-option-address').textContent;
    selectedLocationName.textContent = name;
    selectedLocationAddress.textContent = address;
    selectedLocationInfo.classList.add('visible');
    checkoutBtn.classList.add('active');
    locationSelected = true;
  } else {
    // Toggle modal on deal option click
    dealOptions.forEach(option => {
      option.addEventListener('click', function() {
        // Deselect all other options
        dealOptions.forEach(opt => {
          if (opt !== this) {
            opt.classList.remove('selected');
          }
        });
        
        // Toggle this option
        this.classList.toggle('selected');
        selectedDealOption = this.classList.contains('selected') ? this : null;
        
        // Show modal if option is selected
        if (this.classList.contains('selected')) {
          // Update modal with selected deal info
          updateModalDealInfo(this);
          locationModal.classList.add('show');
          document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
      });
    });
    
    // Close modal when clicking the close button
    closeModalBtn.addEventListener('click', function() {
      locationModal.classList.remove('show');
      document.body.style.overflow = ''; // Restore scrolling
    });
    
    // Close modal when clicking outside the modal content
    locationModal.addEventListener('click', function(e) {
      if (e.target === locationModal) {
        locationModal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
      }
    });
    
    // Handle location selection
    locationOptions.forEach(option => {
      option.addEventListener('click', function() {
        // Remove selection from all options
        locationOptions.forEach(opt => opt.classList.remove('selected'));
        
        // Select this option
        this.classList.add('selected');
        selectedLocationElement = this;
        
        // Get location name and address
        const name = this.querySelector('.location-option-name').textContent;
        const address = this.querySelector('.location-option-address').textContent;
        
        // Update selected location info (but don't close modal yet)
        selectedLocationName.textContent = name;
        selectedLocationAddress.textContent = address;
        
        // Activate confirm button
        confirmLocationBtn.classList.add('active');
        confirmLocationBtn.disabled = false;
      });
    });
    
    // Handle confirm button click
    confirmLocationBtn.addEventListener('click', function() {
      if (selectedLocationElement) {
        // Get location name for checkout
        const locationName = selectedLocationElement.querySelector('.location-option-name').textContent;
        const selectedDeal = document.querySelector('.deal-option.selected');
        const dealOption = selectedDeal ? selectedDeal.getAttribute('data-option') : '1';
        const dealPrice = selectedDeal ? selectedDeal.querySelector('.discount-price').textContent : '$139';
        
        // Mark as selected and update UI
        locationSelected = true;
        checkoutBtn.classList.add('active');
        locationReminder.classList.remove('show');
        selectedLocationInfo.classList.add('visible');
        
        // Close modal
        locationModal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
        
        // Proceed to checkout directly
        alert(`Procediendo al pago para la oferta #${dealOption} (${dealPrice}) en ${locationName}`);
        // Here you would redirect to checkout
        // window.location.href = "checkout.html?location=" + encodeURIComponent(locationName) + "&deal=" + dealOption;
      } else {
        // Alert user to select a location first
        alert('Por favor selecciona una ubicación antes de continuar');
      }
    });
  }
  
  // Handle checkout button click
  checkoutBtn.addEventListener('click', function() {
    if (locationSelected) {
      // Get selected location
      const selectedOption = document.querySelector('.location-option.selected');
      
      if (selectedOption) {
        const locationName = selectedOption.querySelector('.location-option-name').textContent;
        const selectedDeal = document.querySelector('.deal-option.selected');
        const dealOption = selectedDeal ? selectedDeal.getAttribute('data-option') : '1';
        const dealPrice = selectedDeal ? selectedDeal.querySelector('.discount-price').textContent : '$139';
        
        alert(`Procediendo al pago para la oferta #${dealOption} (${dealPrice}) en ${locationName}`);
        
        // Here you would pass the selection to your checkout process
        // location.href = "checkout.html?location=" + encodeURIComponent(locationName) + "&deal=" + dealOption;
      }
    } else {
      // Show modal to select a location
      if (!selectedDealOption) {
        // If no deal is selected, select the first one
        dealOptions[0].classList.add('selected');
        selectedDealOption = dealOptions[0];
        updateModalDealInfo(selectedDealOption);
      }
      
      locationModal.classList.add('show');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
      
      // Show reminder message
      locationReminder.classList.add('show');
    }
  });
  
  // Function to update the modal with selected deal info
  function updateModalDealInfo(dealElement) {
    if (!dealElement) {
      selectedDealSummary.style.display = 'none';
      return;
    }
    
    const dealOption = dealElement.getAttribute('data-option');
    const dealText = dealElement.querySelector('.deal-option-text').innerHTML;
    const discountPrice = dealElement.querySelector('.discount-price').textContent;
    const originalPrice = dealElement.querySelector('.original-price').textContent;
    const discountBadge = dealElement.querySelector('.discount-badge').textContent;
    
    // Hide the title completely
    modalDealTitle.style.display = 'none';
    modalDealTag.style.display = 'none';
    
    // Create a compact description that doesn't repeat the title
    const descriptionLines = dealText.split('<br>');
    // Create a simplified description with just core information
    const compactDescription = 'TODO INCLUIDO para 2 personas + extras';
    
    modalDealDescription.innerHTML = compactDescription;
    modalDealPrice.textContent = discountPrice;
    modalOriginalPrice.textContent = originalPrice;
    modalDealDiscount.textContent = discountBadge;
    
    selectedDealSummary.style.display = 'block';
  }
}); 