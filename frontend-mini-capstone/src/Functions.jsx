
export function formatDate(isoString) {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${month}-${day}-${year}`;
};


export function formatCurrency(amount, decimal=true) {

  if (decimal) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  }
  else {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }
};


export function daysUntil(date) {
  let today = new Date(); // Get today's date
  today.setHours(0, 0, 0, 0); // Ensure the time part is set to midnight
  
  let target = new Date(formatDate(date));
  target.setHours(0, 0, 0, 0); // Ensure the time part is set to midnight

  const timeDifference = target.getTime() - today.getTime(); // Difference in milliseconds
  const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

  return Math.max(dayDifference, 0);
};