#include <iostream>
#include <ctime>

int main() {
	std::time_t t = std::time(nullptr);
	std::cout << "Hello ASL! The date is: " << std::asctime(std::localtime(&t)) << std::endl;
	return 0;
}
