# Terribly-tiny-tales-Assignment

Develop a frontend in Reactjs or Nextjs, which does the following:
On first load, only has a Submit button
On clicking on Submit, it will fetch the contents of https://www.terriblytinytales.com/test.txt
Parse the content and find the frequency of occurrence of each word (some words will occur only once, some twice and so on, and some will occur N times)
Then on the frontend, plot a histogram of the 20 most occurring words.
Also build an "Export" button, which when clicked will download a CSV file of the histogram data.
X-axis = top 20 words with highest occurrence Y-axis = how many times they occurred in the file



Here's a brief explanation of what's happening in this code:

We define a functional component called FrequencyCounter.
Inside the component, we use the useState hook to create a state variable called histogramData and a setter function called setHistogramData. histogramData will hold the data for the histogram, and will be null until the user clicks the "Submit" button.
We define two callback functions: fetchData, which is called when the "Submit" button is clicked and fetches the text data from the given URL, counts the frequency of each word,
