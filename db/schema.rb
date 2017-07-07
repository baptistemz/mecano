# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170707153312) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "domains", force: :cascade do |t|
    t.string  "name"
    t.string  "kind"
    t.integer "mecano_profile_id"
    t.string  "value"
    t.index ["mecano_profile_id"], name: "index_domains_on_mecano_profile_id", using: :btree
  end

  create_table "mecano_profiles", force: :cascade do |t|
    t.integer "user_id"
    t.boolean "pro"
    t.string  "company_name"
    t.string  "wall_picture"
    t.float   "rating"
    t.boolean "mobile"
    t.string  "address"
    t.integer "radius"
    t.integer "price"
    t.string  "city"
    t.string  "country"
    t.boolean "all_vehicles"
    t.float   "latitude"
    t.float   "longitude"
    t.float   "min_lat"
    t.float   "min_lng"
    t.float   "max_lat"
    t.float   "max_lng"
    t.index ["user_id"], name: "index_mecano_profiles_on_user_id", using: :btree
  end

  create_table "recommendations", force: :cascade do |t|
    t.integer "mecano_profile_id"
    t.integer "user_id"
    t.integer "domain_id"
    t.index ["domain_id"], name: "index_recommendations_on_domain_id", using: :btree
    t.index ["mecano_profile_id"], name: "index_recommendations_on_mecano_profile_id", using: :btree
    t.index ["user_id"], name: "index_recommendations_on_user_id", using: :btree
  end

  create_table "services", force: :cascade do |t|
    t.string  "status",            default: "pending"
    t.integer "amount"
    t.integer "vehicle_id"
    t.integer "user_id"
    t.integer "mecano_profile_id"
    t.index ["mecano_profile_id"], name: "index_services_on_mecano_profile_id", using: :btree
    t.index ["user_id"], name: "index_services_on_user_id", using: :btree
    t.index ["vehicle_id"], name: "index_services_on_vehicle_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "provider",               default: "email", null: false
    t.string   "uid",                    default: "",      null: false
    t.string   "encrypted_password",     default: "",      null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,       null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email"
    t.json     "tokens"
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
    t.string   "profile_picture"
    t.boolean  "is_mecano",              default: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true, using: :btree
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true, using: :btree
  end

  create_table "vehicles", force: :cascade do |t|
    t.string  "brand"
    t.string  "model"
    t.integer "year"
    t.integer "user_id"
    t.string  "trim"
    t.index ["user_id"], name: "index_vehicles_on_user_id", using: :btree
  end

  add_foreign_key "domains", "mecano_profiles"
  add_foreign_key "mecano_profiles", "users"
  add_foreign_key "recommendations", "domains"
  add_foreign_key "recommendations", "mecano_profiles"
  add_foreign_key "recommendations", "users"
  add_foreign_key "services", "mecano_profiles"
  add_foreign_key "services", "users"
  add_foreign_key "services", "vehicles"
  add_foreign_key "vehicles", "users"
end
