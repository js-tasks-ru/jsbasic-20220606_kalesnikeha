function showSalary(users, age) {
  return users.filter((u) => u.age <= age).map((e) => e.name + ", " + e.balance).join("\n")
}
