// Users Collection - Stores user information and authentication details
const UserSchema = {
    _id: ObjectId,          // Auto-generated MongoDB ID
    username: String,       // Username for login
    email: String,          // User's email address
    password: String,       // Hashed password (never store plaintext)
    firstName: String,      // User's first name
    lastName: String,       // User's last name
    role: {                 // Role-based access control
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    createdAt: Date,        // Account creation timestamp
    lastLogin: Date,        // Last login timestamp
    isActive: Boolean,      // Account status
    profilePicture: String  // URL to profile picture
  };
  
  // Categories Collection - Different subscription categories
  const CategorySchema = {
    _id: ObjectId,          // Auto-generated MongoDB ID
    name: String,           // Category name (e.g., "Sports", "Movies", "Education")
    description: String,    // Category description
    icon: String,           // Icon representation URL
    isActive: Boolean,      // Whether this category is active
    createdAt: Date,        // When the category was created
    updatedAt: Date         // When the category was last updated
  };
  
  // Subscription Plans Collection - Details of available subscription plans
  const SubscriptionPlanSchema = {
    _id: ObjectId,          // Auto-generated MongoDB ID
    name: String,           // Plan name (e.g., "Basic Sports Pack", "Premium Movies")
    description: String,    // Plan description
    categoryId: {           // Reference to category
      type: ObjectId,
      ref: 'Category'
    },
    price: {
      amount: Number,       // Price amount
      currency: {           // Currency type
        type: String,
        default: 'USD'
      }
    },
    duration: {             // Duration of the subscription
      value: Number,        // Number of time units
      unit: {               // Time unit
        type: String,
        enum: ['day', 'week', 'month', 'year'],
        default: 'month'
      }
    },
    features: [String],     // Array of features included in this plan
    isPopular: Boolean,     // Flag for popular plans
    isActive: Boolean,      // Whether this plan is currently available
    createdAt: Date,        // When the plan was created
    updatedAt: Date         // When the plan was last updated
  };
  
  // User Subscriptions Collection - Tracks which users are subscribed to which plans
  const UserSubscriptionSchema = {
    _id: ObjectId,          // Auto-generated MongoDB ID
    userId: {               // Reference to user
      type: ObjectId,
      ref: 'User'
    },
    planId: {               // Reference to subscription plan
      type: ObjectId,
      ref: 'SubscriptionPlan'
    },
    status: {               // Subscription status
      type: String,
      enum: ['active', 'expired', 'cancelled', 'pending'],
      default: 'pending'
    },
    startDate: Date,        // When the subscription started
    endDate: Date,          // When the subscription will end
    autoRenew: Boolean,     // Whether subscription should automatically renew
    paymentMethod: {        // Payment method information
      type: String,
      enum: ['credit_card', 'paypal', 'bank_transfer', 'other']
    },
    paymentDetails: {       // Payment details (tokenized/encrypted)
      cardLast4: String,    // Last 4 digits of card (if applicable)
      cardType: String,     // Type of card (if applicable)
      expiryDate: String    // Expiry date (if applicable)
    },
    transactionHistory: [{  // History of transactions for this subscription
      transactionId: String,
      amount: Number,
      currency: String,
      status: String,
      date: Date
    }],
    createdAt: Date,        // When the subscription record was created
    updatedAt: Date         // When the subscription record was last updated
  };
  
  // Payment Transactions Collection - Detailed transaction records
  const TransactionSchema = {
    _id: ObjectId,          // Auto-generated MongoDB ID
    userSubscriptionId: {   // Reference to the user subscription
      type: ObjectId,
      ref: 'UserSubscription'
    },
    userId: {               // Reference to user
      type: ObjectId,
      ref: 'User'
    },
    planId: {               // Reference to subscription plan
      type: ObjectId,
      ref: 'SubscriptionPlan'
    },
    amount: Number,         // Transaction amount
    currency: String,       // Currency code
    paymentMethod: String,  // Method of payment
    status: {               // Transaction status
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded']
    },
    paymentGatewayResponse: Object, // Response from payment processor
    createdAt: Date,        // Transaction timestamp
    transactionReference: String    // External reference number
  };
  
  // Audit Logs - Track admin actions for security and accountability
  const AuditLogSchema = {
    _id: ObjectId,          // Auto-generated MongoDB ID
    adminId: {              // Reference to admin user
      type: ObjectId,
      ref: 'User'
    },
    action: String,         // Action performed (e.g., "updated plan", "deleted user")
    entityType: String,     // Type of entity affected (e.g., "User", "SubscriptionPlan")
    entityId: ObjectId,     // ID of the entity affected
    oldValues: Object,      // Previous values (for updates)
    newValues: Object,      // New values (for updates)
    ipAddress: String,      // IP address of admin
    userAgent: String,      // Browser/client information
    timestamp: Date         // When the action occurred
  };
  
  // Example indexes to optimize queries
  // User email index for login queries
  db.users.createIndex({ email: 1 }, { unique: true });
  
  // Index for finding active subscription plans by category
  db.subscriptionPlans.createIndex({ categoryId: 1, isActive: 1 });
  
  // Index for finding user subscriptions
  db.userSubscriptions.createIndex({ userId: 1, status: 1 });
  
  // Index for subscription end date to find expiring subscriptions
  db.userSubscriptions.createIndex({ endDate: 1, status: 1 });
  
  // Index for audit logging by admin
  db.auditLogs.createIndex({ adminId: 1, timestamp: -1 });