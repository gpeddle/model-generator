package main

import (
	"encoding/xml"
	"fmt"
	"os"
	"strings"
	"text/template"
)

type Property struct {
	Name         string `xml:"name,attr"`
	Type         string `xml:"type,attr"`
	IsCollection bool   `xml:"isCollection,attr"`
	Required     bool   `xml:"required,attr"`
}

type Class struct {
	Name       string     `xml:"name,attr"`
	Properties []Property `xml:"properties>property"`
}

type Model struct {
	XMLName xml.Name `xml:"model"`
	Classes []Class  `xml:"class"`
}

func generateMethodParameters(parameters []Property) string {
	var paramStrings []string
	for _, p := range parameters {
		// Check if the property is a collection, and skip it if true
		if p.IsCollection {
			continue
		}
		paramStrings = append(paramStrings, fmt.Sprintf("%s %s", p.Name, p.Type))
	}
	return strings.Join(paramStrings, ", ")
}

func capitalize(s string) string {
	if len(s) == 0 {
		return s
	}
	return strings.ToUpper(s[0:1]) + s[1:]
}

func main() {
	// Read the XML definition file
	xmlFile, err := os.ReadFile("model-definition.xml")
	if err != nil {
		fmt.Println("Error reading XML file:", err)
		return
	}

	// Parse XML data into a Model struct
	var model Model
	err = xml.Unmarshal(xmlFile, &model)
	if err != nil {
		fmt.Println("Error parsing XML:", err)
		return
	}

	// Read the Handlebars template file
	templateFile, err := os.ReadFile("model-template.hbs")
	if err != nil {
		fmt.Println("Error reading template file:", err)
		return
	}

	// Define custom template functions
	funcMap := template.FuncMap{
		"generateMethodParameters": generateMethodParameters,
		"capitalize":               capitalize,
	}

	// Create a new template with custom functions
	tmpl := template.New("TypeScriptTemplate").Funcs(funcMap)

	// Parse the template
	tmpl, err = tmpl.Parse(string(templateFile))
	if err != nil {
		fmt.Println("Error parsing template:", err)
		return
	}

	// Create a TypeScript file for output
	outputFile, err := os.Create("generated-model.ts")
	if err != nil {
		fmt.Println("Error creating output file:", err)
		return
	}
	defer outputFile.Close()

	// Execute the template and write the generated code to the TypeScript file
	err = tmpl.Execute(outputFile, model)
	if err != nil {
		fmt.Println("Error executing template:", err)
		return
	}

	fmt.Println("Model classes generated successfully.")
}
