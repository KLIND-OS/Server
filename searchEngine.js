class SearchEngine {
  static default = "brave"
  static supportedEngines = {
    brave: "https://search.brave.com/search?q=",
    seznam: "https://search.seznam.cz/?q=",
    google: "https://www.google.com/search?q=",
    bing: "https://www.bing.com/search?q=",
    yahoo: "https://search.yahoo.com/search?p=",
    duckduckgo: "https://duckduckgo.com/?q=",
  }
  static search(query, searchEngine=this.default) {
    const encodedQuery = encodeURIComponent(query);
    const baseUrl = this.supportedEngines[searchEngine]
    if (baseUrl) {
      windows.open("brow", baseUrl + encodedQuery);
    }
    else {
      throw new Error("Unsupported search engine!");
    }
  }
}
