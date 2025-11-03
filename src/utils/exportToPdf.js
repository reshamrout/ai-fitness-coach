import jsPDF from 'jspdf';

export const exportToPdf = (plan, user) => {
  const doc = new jsPDF();
  let y = 15; // Vertical position tracker

  // Title
  doc.setFontSize(22);
  doc.text(`AI Fitness Plan for ${user.name}`, 105, y, { align: 'center' });
  y += 10;
  
  // User Details
  doc.setFontSize(12);
  doc.text(`Goal: ${user.goal} | Level: ${user.level} | Location: ${user.location}`, 105, y, { align: 'center' });
  y += 15;

  // --- Workout Plan ---
  doc.setFontSize(18);
  doc.text('🏋️ Workout Plan', 15, y);
  y += 7;

  plan.workoutPlan.forEach(day => {
    if (y > 270) { // Check for page break
      doc.addPage();
      y = 15;
    }
    doc.setFontSize(14);
    doc.text(`${day.day}: ${day.focus}`, 20, y);
    y += 6;
    doc.setFontSize(10);
    day.routine.forEach(ex => {
      doc.text(`- ${ex.exercise}: ${ex.sets} sets x ${ex.reps} reps (Rest: ${ex.rest})`, 25, y);
      y += 5;
    });
    y += 5; // Extra space
  });

  // --- Diet Plan ---
  if (y > 250) { // Check for page break
    doc.addPage();
    y = 15;
  }
  y += 10;
  doc.setFontSize(18);
  doc.text('🥗 Diet Plan', 15, y);
  y += 7;

  plan.dietPlan.forEach(day => {
    if (y > 270) {
      doc.addPage();
      y = 15;
    }
    doc.setFontSize(14);
    doc.text(day.day, 20, y);
    y += 6;
    doc.setFontSize(10);
    doc.text(`Breakfast: ${day.meals.breakfast}`, 25, y);
    y += 5;
    doc.text(`Lunch: ${day.meals.lunch}`, 25, y);
    y += 5;
    doc.text(`Dinner: ${day.meals.dinner}`, 25, y);
    y += 5;
    doc.text(`Snack: ${day.meals.snack}`, 25, y);
    y += 7;
  });

  // Save the PDF
  doc.save(`AI-Fitness-Plan-${user.name}.pdf`);
};