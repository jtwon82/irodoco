package com.irodco.util;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRichTextString;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.view.document.AbstractExcelView;

@SuppressWarnings("deprecation")
public class MyExcelView extends AbstractExcelView {
	private static final Logger logger = LoggerFactory.getLogger(MyExcelView.class);

	@Override
	protected void buildExcelDocument(Map<String, Object> model, HSSFWorkbook workbook, HttpServletRequest request,
			HttpServletResponse response)  {

		// VARIABLES REQUIRED IN MODEL
		String sheetName = (String) model.get("sheetname");
		List<String> headers = (List<String>) model.get("headers");
		List<Map<String, String>> results = (List<Map<String, String>>) model.get("list");
		List<String> numericColumns = new ArrayList<String>();
		if (model.containsKey("numericcolumns"))
			numericColumns = (List<String>) model.get("numericcolumns");

		try {
			// BUILD DOC
			HSSFSheet sheet = workbook.createSheet(sheetName);
			// sheet.setDefaultColumnWidth((short) 12);
			int currentRow = 0;
			short currentColumn = 0;

			logger.debug(String.format("Excel 44 %s", sheet));

			// CREATE STYLE FOR HEADER
			HSSFCellStyle headerStyle = workbook.createCellStyle();
			HSSFFont headerFont = workbook.createFont();
			headerFont.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
			headerStyle.setFont(headerFont);
			String[] cols = { "REGDATES", "MAIN_WEB", "MAIN_MOB", "NOTICE_WEB", "NOTICE_MOB", "QRCODE_WEB",
					"QRCODE_MOB", "CCTV_WEB", "CCTV_MOB", "TOTAL" };

			// POPULATE HEADER COLUMNS
			HSSFRow headerRow = sheet.createRow(currentRow);
			for (String header : headers) {
				sheet.setColumnWidth(currentColumn, 4000);
				HSSFRichTextString text = new HSSFRichTextString(header);
				HSSFCell cell = headerRow.createCell(currentColumn);
				cell.setCellStyle(headerStyle);
				cell.setCellValue(text);
				currentColumn++;
			}

			// POPULATE VALUE ROWS/COLUMNS
			currentRow++;// exclude header
			for (Map<String, String> result : results) {
				currentColumn = 0;
				HSSFRow row = sheet.createRow(currentRow);

				logger.debug(String.format("70 %s", result));

				for (int i = 0; i < 10; i++) {
					HSSFCell cell = row.createCell(i);
					if (i == 0) {
						cell.setCellValue(new HSSFRichTextString(String.valueOf(result.get(cols[i]))));
					} else {
						cell.setCellType(HSSFCell.CELL_TYPE_NUMERIC);
						cell.setCellValue(Integer.parseInt(String.valueOf(result.get(cols[i]))));
					}
				}

				currentRow++;
			}
		} catch (NullPointerException e) {
			logger.error(String.format("83 err %s", e));
		}
	}
}
