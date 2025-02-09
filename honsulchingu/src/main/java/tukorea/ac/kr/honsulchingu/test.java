package main.java.tukorea.ac.kr.honsulchingu;

class Count {

	void sub(int... v) {

		System.out.printf("인수의 개수: %d\n", v.length);
		for (int x : v) {
            System.out.printf("%d ", x);
        }
		System.out.printf("\n");
	}
}

public class test {

	public static void main(String[] args) {

		Count c = new Count();
		
		c.sub(1, 2);
		c.sub(2, 3, 4, 5, 6);
		c.sub();

        test a = new test();

        a.test_print();
		
		return;
	}

    public test() {

        System.out.printf("test\n");
    }

    public void test_print() {

        System.out.printf("test_print\n");
    }
}