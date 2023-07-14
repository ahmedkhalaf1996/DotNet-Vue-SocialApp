namespace backend.Models;

public class MongoDBSettings {
    public string ConnectionString { get; set; } = null!;
    public string DatabaseName { get; set; } = null!;
    public string UserCollection { get; set; } = null!;
    public string postsCollection { get; set; } = null!;
             
}

