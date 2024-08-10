import React from "react";

const GeneratePDF: React.FC = () => {
  const downloadPDF = async () => {
    try {
      const response = await fetch("/api/v1/generatePdf");
      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "page.pdf");
      document.body.appendChild(link);
      link.click();

      // Check if parentNode is not null before removing the link
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  return (
    <div>
      <h1>My Page</h1>
      <p>This is the content of the page you want to convert to PDF.</p>
      <button onClick={downloadPDF}>Download PDF</button>
    </div>
  );
};

export default GeneratePDF;
