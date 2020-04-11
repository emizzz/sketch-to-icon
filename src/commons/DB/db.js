
class DB {

  constructor() {
	  		
		this.server_path = process.env.REACT_APP_API_SERVER_ENDPOINT
		this.github_repo_path = process.env.REACT_APP_API_GITHUB_ENDPOINT;
		this.icon_endpoint = this.server_path + "icons.json";
		this.model_endpoint = process.env.REACT_APP_API_MODEL_ENDPOINT
	}
	
	getModelPath(){
		return this.model_endpoint
	}
	getGithubPath(){
		return this.github_repo_path
	}

	async getIcons(){
		let response = await fetch(this.icon_endpoint);
		response = await response.json()
		return response.icons
	}
	
}
export default DB;